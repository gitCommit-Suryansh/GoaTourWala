import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import CreatePackage from './components/CreatePackage';
import SeePayments from './components/SeePayments';
import ViewPlanTrips from './components/ViewPlanTrips';
import ExistingSubcategories from './components/ExistingSubcategories';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AdminPanel/>}/>
        <Route path='/CreatePackage' element={<CreatePackage/>}/>
        <Route path='/seePayments' element={<SeePayments/>}/>
        <Route path='/seePlanTrips' element={<ViewPlanTrips/>}/>
        <Route path="/editSubcategories" element={<ExistingSubcategories/>}/>
  
      </Routes>
    </Router>
  )
}

export default App