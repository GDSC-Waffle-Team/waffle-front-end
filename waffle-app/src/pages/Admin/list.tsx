import AdminNav from '../../components/Admin/AdminNav';
import AdminList from '../../components/Admin/AdminMemberProfile';
import useAdmin from '../../hook/useAdmin';

export default function List() {
  return (
    <>
      <AdminNav />
      <AdminList />
    </>
  );
}
