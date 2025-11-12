import { NextResponse } from "next/server"

interface CreditPackage {
  id: string
  credits: number
  price: number
  currency: string
}

const creditPackages: CreditPackage[] = [
  { id: "starter", credits: 10, price: 19, currency: "INR" },
  { id: "pro", credits: 50, price: 49, currency: "INR" },
  { id: "enterprise", credits: 200, price: 299, currency: "INR" },
]

export async function POST(request: Request) {
  try {
    const { packageId } = await request.json()

    const selectedPackage = creditPackages.find((p) => p.id === packageId)
    if (!selectedPackage) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    // In production, create Razorpay order
    const razorpayOrderId = `order_${Date.now()}`

    return NextResponse.json({
      success: true,
      orderId: razorpayOrderId,
      amount: selectedPackage.price * 100, // Razorpay expects amount in paise
      currency: selectedPackage.currency,
      package: selectedPackage,
    })
  } catch (error) {
    console.error("Credit purchase error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
