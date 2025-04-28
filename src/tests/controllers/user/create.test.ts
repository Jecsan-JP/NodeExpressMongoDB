import { User } from "@/models/user.model";
import { createUser } from "@/controllers/user.controller";
import { Request, Response, NextFunction } from "express";
import { DatabaseError, ValidationError } from "@/errors/errors";

describe("User Controller - Create", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      body: {
        name: "Test User",
        email: "test@example.com",
        age: 25,
        phone: "1234567890",
        address: "Test Address",
        status: "active"
      }
    };
    mockResponse = {
      json: jest.fn()
    };
    nextFunction = jest.fn();
  });

  // Caso exitoso básico
  it("should create a user successfully with all required fields", async () => {
    const mockUser = {
      _id: "1",
      name: "Test User",
      email: "test@example.com",
      status: "active"
    };

    (User.create as jest.Mock) = jest.fn().mockResolvedValue(mockUser);

    await createUser(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(User.create).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    expect(nextFunction).not.toHaveBeenCalled();
  });

  // Caso de error de base de datos
  it("should handle database errors", async () => {
    const error = new DatabaseError("create", { message: "Database error" });
    (User.create as jest.Mock) = jest.fn().mockRejectedValue(error);

    await createUser(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toHaveBeenCalledWith(error);
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

  // Caso de validación de campos requeridos
  it("should handle validation errors", async () => {
    const validationError = {
      name: "ValidationError",
      message: "Email is required",
      errors: { email: { message: "Email is required" } }
    };
    (User.create as jest.Mock) = jest.fn().mockRejectedValue(validationError);

    await createUser(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toHaveBeenCalledWith(expect.any(ValidationError));
    expect(mockResponse.json).not.toHaveBeenCalled();
  });
});
