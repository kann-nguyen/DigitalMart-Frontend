import React, { useEffect, useState } from 'react';
import { RiMoneyEuroCircleFill } from "react-icons/ri";
const DailyRevenueChart = ({ orders }) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentWeek = getWeekNumber(currentDate);
    const currentMonth = currentDate.getMonth() + 1;

    let dailyTotal = 0;
    let weeklyTotal = 0;
    let monthlyTotal = 0;

    orders.forEach(order => {
        const orderDate = new Date(order.createdAt);
        const orderDay = orderDate.getDate();
        const orderWeek = getWeekNumber(orderDate);
        const orderMonth = orderDate.getMonth() + 1;

        if (orderDay === currentDay) {
            dailyTotal += order.totalPrice;
        }

        if (orderWeek === currentWeek) {
            weeklyTotal += order.totalPrice;
        }

        if (orderMonth === currentMonth) {
            monthlyTotal += order.totalPrice;
        }
    });
    return (
        <div className='statistic'>
            <div className='statistic-item' style={{width: '400px'}}> 
                <div className='text-center'>
                    <div style={{ fontSize: '30px' }}>{formatCurrency(dailyTotal)}</div>
                    <div style={{ color: '#888' }}>Revenue Daily</div>
                </div>
                <RiMoneyEuroCircleFill className='statistic-item-icon' />
            </div>
            <div className='statistic-item' style={{width: '400px'}} >
                <div className='text-center'>
                    <div style={{ fontSize: '30px' }}>{formatCurrency(weeklyTotal)}</div>
                    <div style={{ color: '#888' }}>Revenue Weekly</div>
                </div>
                <RiMoneyEuroCircleFill className='statistic-item-icon' />
            </div>
            <div className='statistic-item' style={{ width: '400px' }}>
                <div className='text-center'>
                    <div style={{ fontSize: '30px' }}>{formatCurrency(monthlyTotal)}</div>
                    <div style={{ color: '#888' }}>Revenue Monthly</div>
                </div>
                <RiMoneyEuroCircleFill className='statistic-item-icon' />
            </div>
        </div>
    )
};
const getWeekNumber = (date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
};
const formatCurrency = (amount) => {
    if (amount >= 1000000000) {
        return (amount / 1000000000).toFixed(2) + ' B';
    } else if (amount >= 1000000) {
        return (amount / 1000000).toFixed(2) + ' M';
    } else if (amount >= 1000) {
        return (amount / 1000).toFixed(2) + ' K';
    } else {
        return amount.toFixed(2);
    }
};
export default DailyRevenueChart;
