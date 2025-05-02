
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';

const CheckoutForm: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, you'd handle payment processing here
    // For now, we're simulating a successful order
    
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "You will receive a confirmation email shortly.",
      });
      
      // Clear the cart
      clearCart();
      
      // Navigate to order tracking page with a fake order ID
      navigate('/order-tracking/ORD-12345');
      
      setIsSubmitting(false);
    }, 1500);
  };

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-medium">Contact Information</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-xl font-medium">Shipping Address</h2>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State/Province</Label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP/Postal Code</Label>
            <Input
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-xl font-medium">Payment Information</h2>
        <p className="text-sm text-muted-foreground">
          This is just a demo. No real payment will be processed.
        </p>
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="cardName">Name on Card</Label>
            <Input
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="cardExpiry">Expiry Date</Label>
              <Input
                id="cardExpiry"
                name="cardExpiry"
                placeholder="MM/YY"
                value={formData.cardExpiry}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardCvc">CVC</Label>
              <Input
                id="cardCvc"
                name="cardCvc"
                placeholder="123"
                value={formData.cardCvc}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span>$0.00</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Tax</span>
          <span>${(subtotal * 0.1).toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between font-medium">
          <span>Total</span>
          <span>${(subtotal + subtotal * 0.1).toFixed(2)}</span>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Place Order"}
      </Button>
    </form>
  );
};

export default CheckoutForm;
