import React from 'react'
import { useState } from 'react'
import './ExpenseTracker.css'

function ExpenseTracker() {
    const [formData,setFormData]=useState({
        expense:"",
        amount:"",
    })
    const [incomeData,setIncomeData]=useState({
      income:"",
      amountinc:"",
    })
    const [transactions,setTransactions]=useState([])
    const [balance,setBalance]=useState([])



    const handleInputChange=(event)=>{
        const {name,value}=event.target
        setFormData((prevData)=>({...prevData,[name]:value}))
        setIncomeData((prevData)=>({...prevData,[name]:value}))


    }

    const handleAddExpense=(event)=>{
      event.preventDefault();

      if (!formData.expense || !formData.amount) return;

      const newTransaction = {
        expense:formData.expense,
        amount:parseFloat(formData.amount),
      };
      setTransactions((prevTransactions) => [...prevTransactions, newTransaction])
      setFormData({
        expense: "",
        amount: "",});
    }

    const handleAddIncome=(event)=>{
      event.preventDefault();
      if (!incomeData.income || !incomeData.amountinc) return;

      const newBalance ={
        income:incomeData.income,
        amountinc:parseFloat(incomeData.amountinc),
      };
      setBalance((prevBalance)=>[...prevBalance,newBalance])
      setIncomeData({
        income:"",
        amountinc:"",
      })

    }


    const calculateBalance =()=>{
      const totalIncome = transactions.reduce((total,transaction)=>total-transaction.amount,0);
      const totalExpense = balance.reduce((total,balance)=>total-balance.amountinc,0);
      return totalIncome-totalExpense

    }
    
    const calculateTotalExpense =()=>{
      return transactions.reduce((total,transaction)=>transaction.amount+total,0);
    }

    const calculateTotalIncome =()=>{
      return balance.reduce((total,balance)=>total+balance.amountinc,0)
    }

    


  return (
    <div>
      <h1>ExpenseTracker</h1>
      <div className="header">
        <img
          src="https://i.ibb.co/jfScDTC/budget.png"
          alt="Expense Tracker"
        />
        <div className="balance-container">
          <h2>Your Balance</h2>
          <h2 id="balance" className="balance">₹{calculateBalance().toFixed(2)}</h2>
        </div>
      </div>


      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p id="money-plus" className="money plus">+₹{calculateTotalIncome().toFixed(2)}</p>
        </div>
        <div>
          <h4>Expenses</h4>
          <p id="money-minus" className="money minus">-₹{calculateTotalExpense().toFixed(2)}</p>
        </div>
      </div>

      <h3>Add Income / Expense</h3>
      <div className='inc-exp-container'>
        <div className='exp-container'>
        <form id="form" onSubmit={handleAddIncome}>
        <div class="form-control">
          <h4>Income</h4><br/>
          <input type="text" id="text" placeholder="Enter Income" value={incomeData.income}
        name='income' onChange={handleInputChange} /><br/>
        </div>
        <div class="form-control">
        
          <input  type='number'
        value={incomeData.amountinc}
        name='amountinc'
        placeholder='Amount' onChange={handleInputChange} /><br/>
        </div>
        <button class="btn" type='submit'>Add Income</button>
      </form>

        </div>
        <div  className='exp-container'>
        <form id="form" onSubmit={handleAddExpense}>
        <div class="form-control">
        <h4>Expense</h4><br/>
          <input type="text" id="text" placeholder="Enter Expense" value={formData.expense}
        name='expense' onChange={handleInputChange} /><br/>
        </div>
        <div class="form-control">
          
          <input  type='number'
        value={formData.amount}
        name='amount'
        placeholder='Amount' onChange={handleInputChange} /><br/>
        </div>
        <button class="btn" type='submit'>Add Expense</button>
      </form>
        </div>
      </div>
      
      <h3>All Transactions</h3>
      <ul id="list" class="list">
        {
        transactions.map((transaction,index)=>(
            <li key={index}>{transaction.expense} : {transaction.amount}</li>
        ))
        }
      </ul>

    </div>
    
  )
}

export default ExpenseTracker
