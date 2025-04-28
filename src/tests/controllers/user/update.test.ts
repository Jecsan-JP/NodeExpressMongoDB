import { User } from "@/models/user.model";
import { updateUser } from "@/controllers/user.controller";
import { Request, Response, NextFunction } from "express";
import { DatabaseError, NotFoundError, ValidationError } from "@/errors/errors";

describe("User Controller - Update", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      params: { id: "1" },
      body: {
        name: "Updated User",
        email: "updated@example.com"
      }
    };
    mockResponse = {
      json: jest.fn()
    };
    nextFunction = jest.fn();
  });

  it("should update a user successfully", async () => {
    const mockUpdatedUser = {
      _id: "1",
      name: "Updated User",
      email: "updated@example.com",
      status: "active"
    };

    (User.findByIdAndUpdate as jest.Mock) = jest.fn().mockResolvedValue(mockUpdatedUser);

    await updateUser(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      "1",
      mockRequest.body,
      { new: true, runValidators: true }
    );
    expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedUser);
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it("should handle user not found when updating", async () => {
    (User.findByIdAndUpdate as jest.Mock) = jest.fn().mockResolvedValue(null);

    await updateUser(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toHaveBeenCalledWith(expect.any(NotFoundError));
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

  it("should handle database errors when updating", async () => {
    const error = new DatabaseError("update", { message: "Database error" });
    (User.findByIdAndUpdate as jest.Mock) = jest.fn().mockRejectedValue(error);

    await updateUser(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toHaveBeenCalledWith(error);
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

  it("should handle validation errors when updating", async () => {
    const validationError = {
      name: "ValidationError",
      message: "Invalid email format",
      errors: { email: { message: "Invalid email format" } }
    };
    (User.findByIdAndUpdate as jest.Mock) = jest.fn().mockRejectedValue(validationError);

    await updateUser(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toHaveBeenCalledWith(expect.any(ValidationError));
    expect(mockResponse.json).not.toHaveBeenCalled();
  });
});
