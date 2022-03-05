import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/shared/Loader'
import PageWrapper from '../components/shared/page/PageWrapper'

export default function NotFound() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate("/login")
    }, [])
  return (
    <PageWrapper>
        <Loader/>
    </PageWrapper>
  )
}
