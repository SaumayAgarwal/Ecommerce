import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import api from '../api/axios'

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { cartItems, clearCart } = useCart()
  const navigate = useNavigate()

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    ).toFixed(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await api.post(`/orders?shippingAddress=${encodeURIComponent(shippingAddress)}`)
      clearCart()
      navigate('/orders')
      alert('Order placed successfully!')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.empty}>
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate('/products')} style={styles.shopBtn}>
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Checkout</h1>

      <div style={styles.content}>
        <div style={styles.form}>
          <h2 style={styles.sectionTitle}>Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            {error && <div style={styles.error}>{error}</div>}
            <div style={styles.field}>
              <label style={styles.label}>Shipping Address *</label>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                required
                style={styles.textarea}
                placeholder="Enter your complete shipping address..."
                rows={4}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={styles.submitBtn}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div style={styles.summary}>
          <h2 style={styles.sectionTitle}>Order Summary</h2>
          <div style={styles.items}>
            {cartItems.map((item) => (
              <div key={item.id} style={styles.item}>
                <div>
                  <div style={styles.itemName}>{item.product.name}</div>
                  <div style={styles.itemQty}>Qty: {item.quantity}</div>
                </div>
                <div style={styles.itemPrice}>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div style={styles.total}>
            <span>Total Amount</span>
            <span>${calculateTotal()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 24px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    marginBottom: '32px',
    color: 'var(--text)'
  },
  empty: {
    textAlign: 'center',
    padding: '48px',
    background: 'var(--bg)',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)'
  },
  shopBtn: {
    marginTop: '24px',
    padding: '12px 24px',
    background: 'var(--primary)',
    color: 'white',
    borderRadius: '8px',
    fontWeight: 600
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '32px'
  },
  form: {
    background: 'var(--bg)',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '24px',
    color: 'var(--text)'
  },
  field: {
    marginBottom: '24px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '8px',
    color: 'var(--text)'
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    fontSize: '15px',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  submitBtn: {
    width: '100%',
    padding: '14px',
    background: 'var(--primary)',
    color: 'white',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600
  },
  error: {
    padding: '12px',
    background: '#fee2e2',
    color: '#dc2626',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '20px'
  },
  summary: {
    background: 'var(--bg)',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    height: 'fit-content',
    position: 'sticky',
    top: '88px'
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '24px'
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: '16px',
    borderBottom: '1px solid var(--border)'
  },
  itemName: {
    fontSize: '15px',
    fontWeight: 600,
    color: 'var(--text)',
    marginBottom: '4px'
  },
  itemQty: {
    fontSize: '13px',
    color: 'var(--text-light)'
  },
  itemPrice: {
    fontSize: '15px',
    fontWeight: 600,
    color: 'var(--text)'
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '16px',
    borderTop: '2px solid var(--border)',
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--text)'
  }
}

export default Checkout
