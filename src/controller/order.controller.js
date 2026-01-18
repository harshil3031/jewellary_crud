// create order controller module
import { or } from 'sequelize';
import Jewellary from '../model/jewellary.model.js';
import Order from '../model/order.model.js';

// function to create a new order
export const createOrder = async (orderData) => {
  try {
    const {userId, jewellaryId, quantity, totalPrice, orderDate} = orderData;
    const jewellary = await Jewellary.findByPk(jewellaryId);
    if (!jewellary) {
      throw new Error('Jewellary not found');
    }
    const price = parseFloat(jewellary.price);
    const calculatedTotalPrice = price * quantity;
    orderData.totalPrice = calculatedTotalPrice;
    if(!orderDate){
      orderData.orderDate = new Date();
    }
    const newOrder = await Order.create(orderData);
    console.log("new order created:",newOrder);
    return newOrder;
  } catch (err) {
    throw new Error('Error creating order: ' + err.message);
  }
};

// function to get an order by ID
export const getOrderById = async (orderId) => {
  try {
    const order = await Order.findByPk(orderId);
    return order;
  } catch (err) {
    throw new Error('Error fetching order: ' + err.message);
  }
};

// function to update an order by ID
export const updateOrderById = async (orderId, updateData) => {
  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    const jewellary = await Jewellary.findByPk(updateData.jewellaryId);
    if (!jewellary) {
      throw new Error('Jewellary not found for the order');
    }
    const price = parseFloat(jewellary.price);
    if (updateData.quantity) {
      updateData.totalPrice = price * updateData.quantity;
    }
    const [updatedRowsCount, [updatedOrder]] = await Order.update(updateData, {
      where: { id: orderId },
      returning: true,
    });
    if (updatedRowsCount > 0) {
      return updatedOrder;
    }
    return null;
    } catch (err) {
    throw new Error('Error updating order: ' + err.message);
  }
};

// function to delete an order by ID
export const deleteOrderById = async (orderId) => {
  try {
    const order = await Order.findByPk(orderId);
    if (order) {
      await order.destroy();
      return order;
    }
    return null;
  } catch (err) {
    throw new Error('Error deleting order: ' + err.message);
  }
};