
import UserCard from '../components/UserCard'
import UserList from './UserList'

const DashboardContent = () => {
  return (
    <div>
      <div className="flex gap-4 justify-between flex-wrap">
        <UserCard type="student" />
        <UserCard type="teacher" />
        <UserCard type="parent" />
        <UserCard type="staff" />
      </div>
      <div className='pt-4'>
        <UserList />
      </div>
    </div>
  )
}

export default DashboardContent