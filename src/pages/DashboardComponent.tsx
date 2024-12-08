
import DashboardLayout from './dashboard'


const DashboardComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}

export default DashboardComponent