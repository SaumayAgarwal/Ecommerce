import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { cartItems, loading, updateQuantity, removeFromCart } = useCart()
  const navigate = useNavigate()

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    ).toFixed(2)
  }

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return
    try {
      await updateQuantity(cartItemId, newQuantity)
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to update quantity')
    }
  }

  const handleRemove = async (cartItemId) => {
    try {
      await removeFromCart(cartItemId)
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to remove item')
    }
  }

  if (loading) {
    return <div style={styles.loading}>Loading cart...</div>
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div style={styles.empty}>
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/products')} style={styles.shopBtn}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div style={styles.content}>
          <div style={styles.items}>
            {cartItems.map((item) => (
              <div key={item.id} style={styles.item}>
                <div style={styles.itemInfo}>
                  <h3 style={styles.itemName}>{item.product.name}</h3>
                  <p style={styles.itemPrice}>${item.product.price}</p>
                </div>
                <div style={styles.itemActions}>
                  <div style={styles.quantity}>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      style={styles.qtyBtn}
                    >
                      -
                    </button>
                    <span style={styles.qtyText}>{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      style={styles.qtyBtn}
                      disabled={item.quantity >= item.product.stock}
                    >
                      +
                    </button>
                  </div>
                  <div style={styles.subtotal}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    style={styles.removeBtn}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.summary}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>
            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${calculateTotal()}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div style={styles.total}>
              <span>Total</span>
              <span>${calculateTotal()}</span>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              style={styles.checkoutBtn}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
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
  loading: {
    textAlign: 'center',
    padding: '48px',
    color: 'var(--text-light)'
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
  items: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  item: {
    background: 'var(--bg)',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '24px'
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '8px',
    color: 'var(--text)'
  },
  itemPrice: {
    fontSize: '14px',
    color: 'var(--text-light)'
  },
  itemActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  quantity: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'var(--bg-light)',
    padding: '8px 12px',
    borderRadius: '8px'
  },
  qtyBtn: {
    width: '32px',
    height: '32px',
    background: 'var(--primary)',
    color: 'white',
    borderRadius: '6px',
    fontSize: '18px',
    fontWeight: 600
  },
  qtyText: {
    fontSize: '16px',
    fontWeight: 600,
    minWidth: '24px',
    textAlign: 'center'
  },
  subtotal: {
    fontSize: '18px',
    fontWeight: 700,
    color: 'var(--primary)',
    minWidth: '80px',
    textAlign: 'right'
  },
  removeBtn: {
    padding: '8px 16px',
    background: 'var(--danger)',
    color: 'white',
    borderRadius: '8px',
    fontWeight: 500,
    fontSize: '14px'
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
  summaryTitle: {
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '24px',
    color: 'var(--text)'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontSize: '15px',
    color: 'var(--text-light)'
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '16px',
    marginTop: '16px',
    borderTop: '2px solid var(--border)',
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--text)'
  },
  checkoutBtn: {
    width: '100%',
    marginTop: '24px',
    padding: '14px',
    background: 'var(--primary)',
    color: 'white',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600
  }
}

export default Cart
