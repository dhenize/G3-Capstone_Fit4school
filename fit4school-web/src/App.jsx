import { Routes, Route } from 'react-router-dom';
import AAccMod from './a_pages/a_acc_mod/a_acc_mod.jsx';
import ADashboard from './a_pages/a_dashboard/a_dashboard.jsx';
import AOrders from './a_pages/a_orders/a_orders.jsx';
import AUniforms from './a_pages/a_uniforms/a_uniforms.jsx';
import APayments from './a_pages/a_payments/a_payments.jsx';
import AArchives from './a_pages/a_archives/a_archives.jsx';
import AAccounts from './a_pages/a_accounts/a_accounts.jsx';
import AcDashboard from './ac_pages/ac_dashboard/ac_dashboard.jsx';
import AcPayments from './ac_pages/ac_payments/ac_payments.jsx';
import AcArchives from './ac_pages/ac_archives/ac_archives.jsx';
import EnterMail from './al_forgotpass/entermail/entermail.jsx';
import EnterNum from './al_forgotpass/enternum/enternum.jsx';
import AForgotPass from './al_forgotpass/a_forgotpass/a_forgotpass.jsx';
import BForgotPass from './al_forgotpass/b_forgotpass/b_forgotpass.jsx';

function App(){
  return(
    <>
      <Routes>
        <Route path="/" element={<AAccMod />} />
        <Route path="/a_acc_mod" element={<AAccMod />} />
        <Route path="/a_dashboard" element={<ADashboard />} />
        <Route path="/a_orders" element={<AOrders />} />
        <Route path="/a_uniforms" element={<AUniforms />} />
        <Route path="/a_payments" element={<APayments />} />
        <Route path="/a_archives" element={<AArchives />} />
        <Route path="/a_accounts" element={<AAccounts />} />
        <Route path="/ac_dashboard" element={<AcDashboard />} />
        <Route path="/ac_payments" element={<AcPayments />} />
        <Route path="/ac_archives" element={<AcArchives />} />
        <Route path="/entermail" element={<EnterMail />} />
        <Route path="/enternum" element={<EnterNum />} />
        <Route path="/a_forgotpass" element={<AForgotPass />} />
        <Route path="/b_forgotpass" element={<BForgotPass />} />
      </Routes>
    </>
  );

}

export default App;