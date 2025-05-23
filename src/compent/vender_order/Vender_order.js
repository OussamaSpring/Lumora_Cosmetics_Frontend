// VendorOrder.js (corrected filename)
"use client"
import { useState } from "react"
import Dashboard from "./Dashbord"
import AddProduct from "./Add_product"
import ManageProduct from "./Manage"
import './vender.css' // Corrected filename

export default function Home() {
  const [currentView, setCurrentView] = useState("dashboard")
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleAddProduct = () => setCurrentView("add-product")
  const handleManageProduct = (product) => {
    setSelectedProduct(product)
    setCurrentView("manage-product")
  }
  const handleBack = () => setCurrentView("dashboard")

  return (
    <main className="vendor-container">
      {currentView === "dashboard" && (
        <Dashboard 
          onAddProduct={handleAddProduct} 
          onManageProduct={handleManageProduct} 
        />
      )}
      {currentView === "add-product" && <AddProduct onBack={handleBack} />}
      {currentView === "manage-product" && (
        <ManageProduct product={selectedProduct} onBack={handleBack} />
      )}
    </main>
  )
}