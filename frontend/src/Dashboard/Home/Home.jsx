import React from 'react'
import './Home.css'
import ImgHeader from './img.jpg'

function Home() {
  return (
    <div>
      <div className='row'>
        <div className='col-md-6'>
          <div className='header-img-container'>
            <img className='header-image' src={ImgHeader} alt='Header' />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='features-container'>
          <h2 className='features-heading'>Discover the Benefits of Our BudgetSheet</h2>

            <div className='features-card'>
              <div className='feature-card-icon'>📊</div>
              <div className='feature-card-title'>Consolidate all your financial transactions seamlessly</div>
            </div>

            <div className='features-card'>
              <div className='feature-card-icon'>📈</div>
              <div className='feature-card-title'>Effortlessly monitor your income and expenditures</div>
            </div>

            <div className='features-card'>
              <div className='feature-card-icon'>🔖</div>
              <div className='feature-card-title'>Efficiently categorize your transactions</div>
            </div>

            <div className='features-card'>
              <div className='feature-card-icon'>📉</div>
              <div className='feature-card-title'>Gain insights into your cash flow dynamics</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
