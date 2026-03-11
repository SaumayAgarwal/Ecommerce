import { useState, useEffect } from 'react'
import api from '../api/axios'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders')
      setOrders(response.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div style={styles.loading}>Loading orders...</div>
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Orders</h1>

      {orders.length === 0 ? (
        <div style={styles.empty}>
          <p>You haven't placed any orders yet</p>
        </div>
      ) : (
        <div style={styles.orders}>
          {orders.map((order) => (
            <div key={order.id} style={styles.order}>
              <div style={styles.orderHeader}>
                <div>
                  <h3 style={styles.orderId}>Order #{order.id}</h3>
                  <p style={styles.orderDate}>
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div style={styles.statusBadge}>
                  {order.status}
                </div>
              </div>

              <div style={styles.orderBody}>
                <div style={styles.address}>
                  <strong>Shipping Address:</strong>
                  <p>{order.shippingAddress}</p>
                </div>

                <div style={styles.items}>
                  {order.orderItems.map((item) => (
                    <div key={item.id} style={styles.item}>
                      <div style={styles.itemInfo}>
                        <span style={styles.itemName}>{item.productName}</span>
                        <span style={styles.itemQty}>x {item.quantity}</span>
                      </div>
                      <span style={styles.itemPrice}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={styles.orderTotal}>
                  <span>Total Amount</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '900px',
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
    boxShadow: 'var(--shadow)',
    color: 'var(--text-light)'
  },
  orders: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  order: {
    background: 'var(--bg)',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    overflow: 'hidden'
  },
  orderHeader: {
    padding: '24px',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  orderId: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--text)',
    marginBottom: '4px'
  },
  orderDate: {
    fontSize: '14px',
    color: 'var(--text-light)'
  },
  statusBadge: {
    padding: '8px 16px',
    background: 'var(--secondary)',
    color: 'white',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 600
  },
  orderBody: {
    padding: '24px'
  },
  address: {
    marginBottom: '24px',
    padding: '16px',
    background: 'var(--bg-light)',
    borderRadius: '8px',
    fontSize: '14px',
    color: 'var(--text)'
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px'
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    background: 'var(--bg-light)',
    borderRadius: '8px'
  },
  itemInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  itemName: {
    fontSize: '15px',
    fontWeight: 500,
    color: 'var(--text)'
  },
  itemQty: {
    fontSize: '14px',
    color: 'var(--text-light)'
  },
  itemPrice: {
    fontSize: '15px',
    fontWeight: 600,
    color: 'var(--text)'
  },
  orderTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '16px',
    borderTop: '2px solid var(--border)',
    fontSize: '18px',
    fontWeight: 700,
    color: 'var(--text)'
  }
}

export default Orders
