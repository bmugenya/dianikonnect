import PropertiesClient from "../components/listing/PropertiesClient";
import { useSelector } from 'react-redux'
import EmptyState from "../components/EmptyState";


function PropertiesPage() {

  const { currentUser } = useSelector((state) => state.currentUser)
  const { listings } = useSelector((state) => state.listings)
  
  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subtitle="Please login"
    />
  }


  return (
    <>
    <div className="pt-24">
      <PropertiesClient
        currentUser={currentUser}
        listings={listings}
      />
      </div>
    </>
  )
}

export default PropertiesPage
