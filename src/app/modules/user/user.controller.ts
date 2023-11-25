/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await UserServices.createUserIntoDB(user);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err: any) {
    if (err.code === 404) {
      res.status(404).json({
        success: false,
        message: err.message || 'User already exists!',
        error: {
          code: err.code,
          description: err.description,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'something went wrong',
        error: err,
      });
    }
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getSingleUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result[0],
    });
  } catch (err: any) {
    if (err.code === 404) {
      res.status(404).json({
        success: false,
        message: err.message || 'User not found',
        error: {
          code: err.code,
          description: err.description,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'something went wrong',
        error: err,
      });
    }
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userUpdateDetails = req.body;

    const result = await UserServices.updateSingleUserFromDB(
      Number(userId),
      userUpdateDetails,
    );

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err: any) {
    if (err.code === 404) {
      res.status(404).json({
        success: false,
        message: err.message || 'User not found',
        error: {
          code: err.code,
          description: err.description,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'something went wrong',
        error: err,
      });
    }
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await UserServices.deleteUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    if (err.code === 404) {
      res.status(404).json({
        success: false,
        message: err.message || 'User not found',
        error: {
          code: err.code,
          description: err.description,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'something went wrong',
        error: err,
      });
    }
  }
};

const userProductStore = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const productDetails = req.body;
    await UserServices.userProductStoreFromDB(Number(userId), productDetails);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err: any) {
    if (err.code === 404) {
      res.status(404).json({
        success: false,
        message: err.message || 'User not found',
        error: {
          code: err.code,
          description: err.description,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'something went wrong',
        error: err,
      });
    }
  }
};

const getUserOrdersList = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await UserServices.getUserOrdersListFromDB(
      Number(userId),
    );

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: {
        orders,
      },
    });
  } catch (err: any) {
    if (err.code === 404) {
      res.status(404).json({
        success: false,
        message: err.message || 'User not found',
        error: {
          code: err.code,
          description: err.description,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'something went wrong',
        error: err,
      });
    }
  }
};

const getUserOrdersTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const totalPrice = await UserServices.getUserOrdersTotalPriceFromDB(
      Number(userId),
    );

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice,
      },
    });
  } catch (err: any) {
    if (err.code === 404) {
      res.status(404).json({
        success: false,
        message: err.message || 'User not found',
        error: {
          code: err.code,
          description: err.description,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'something went wrong',
        error: err,
      });
    }
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteUser,
  userProductStore,
  getUserOrdersList,
  getUserOrdersTotalPrice
};
