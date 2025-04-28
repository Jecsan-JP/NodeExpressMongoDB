import { User } from "@/models/user.model";
import { deleteUser } from "@/controllers/user.controller";
import { Request, Response, NextFunction } from "express";
import { DatabaseError, NotFoundError } from "@/errors/errors";

describe("User Controller - Delete", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      params: { id: "1" }
    };
    mockResponse = {
      json: jest.fn()
    };
    nextFunction = jest.fn();
  });

  it("should deactivate a user successfully", async () => {
    const mockUpdatedUser = {
      _id: "1",
      name: "Test User",
      email: "test@example.com",
      status: "inactive"
    };

    (User.findByIdAndUpdate as jest.Mock) = jest.fn().mockResolvedValue(mockUpdatedUser);

    await deleteUser(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      "1",
      { status: "inactive" },
      { new: true }
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Usuario desactivado exitosamente"
    });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it("should handle user not found when deactivating", async () => {
    (User.findByIdAndUpdate as jest.Mock) = jest.fn().mockResolvedValue(null);

    await deleteUser(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toHaveBeenCalledWith(expect.any(NotFoundError));
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

  it("should handle database errors when deactivating", async () => {
    const error = new DatabaseError("delete", { message: "Database error" });
    (User.findByIdAndUpdate as jest.Mock) = jest.fn().mockRejectedValue(error);

    await deleteUser(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toHaveBeenCalledWith(error);
    expect(mockResponse.json).not.toHaveBeenCalled();
  });
});
