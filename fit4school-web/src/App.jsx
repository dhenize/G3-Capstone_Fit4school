import { Routes, Route } from 'react-router-dom';
import AAccMod from './a_pages/a_acc_mod/a_acc_mod.jsx';
import ADashboard from './a_pages/a_dashboard/a_dashboard.jsx';
import AcDashboard from './a_pages/ac_dashboard/ac_dashboard.jsx';

function App(){
  return(
    <>
      <Routes>
        <Route path="/" element={<AAccMod />} />
        <Route path="/a_dashboard" element={<ADashboard />} />
        <Route path="/ac_dashboard" element={<AcDashboard />} />
      </Routes>
    </>
  );

}

export default App;