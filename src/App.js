
import { useState } from 'react';
import Header from './components/Header/Header';
import ResultTable from './components/ResultTable/ResultTable';
import UserInput from './components/UserInput/UserInput';
function App() {

  const [results,setResults]=useState(null)
  const calculateHandler = (userInput) => {
    

    const yearlyData = [];

    let currentSavings = +userInput['current-savings']; // feel free to change the shape of this input object!
    const yearlyContribution = +userInput['yearly-contribution']; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }

    setResults(yearlyData)
  };

  return (
    <div>
      <Header/>
      <UserInput onCalculate={calculateHandler}/>
      
      {!results && <p style={{textAlign:'center'}}>No Investment Calculated</p>}
      {results && <ResultTable data={results} initialInvestment={results['current-savings']} />}
    </div>
  );
}

export default App;
