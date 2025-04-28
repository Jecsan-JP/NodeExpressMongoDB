import { User } from "@/models/user.model";
import { getUsers, getUserById } from "@/controllers/user.controller";
import { Request, Response, NextFunction } from "express";
import { DatabaseError, NotFoundError } from "@/errors/errors";

describe("User Controller - Read", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn()
    };
    nextFunction = jest.fn();
  });

  describe("getUsers", () => {
    it("should return all users successfully", async () => {
      const mockUsers = [
        {
          _id: "1",
          name: "User 1",
          email: "user1@example.com",
          status: "active"
        },
        {
          _id: "2",
          name: "User 2",
          email: "user2@example.com",
          status: "active"
        }
      ];

      (User.find as jest.Mock) = jest.fn().mockResolvedValue(mockUsers);

      await getUsers(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(User.find).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it("should handle database errors when getting users", async () => {
      const error = new DatabaseError("find", { message: "Database error" });
      (User.find as jest.Mock) = jest.fn().mockRejectedValue(error);

      await getUsers(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalledWith(error);
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });

  describe("getUserById", () => {
    beforeEach(() => {
      mockRequest.params = { id: "1" };
    });

    it("should return a user by id successfully", async () => {
      const mockUser = {
        _id: "1",
        name: "Test User",
        email: "test@example.com",
        status: "active"
      };

      (User.findById as jest.Mock) = jest.fn().mockResolvedValue(mockUser);

      await getUserById(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(User.findById).toHaveBeenCalledWith("1");
      expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it("should handle user not found", async () => {
      (User.findById as jest.Mock) = jest.fn().mockResolvedValue(null);

      await getUserById(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalledWith(expect.any(NotFoundError));
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it("should handle database errors when getting user by id", async () => {
      const error = new DatabaseError("findById", { message: "Database error" });
      (User.findById as jest.Mock) = jest.fn().mockRejectedValue(error);

      await getUserById(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalledWith(error);
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });
});
