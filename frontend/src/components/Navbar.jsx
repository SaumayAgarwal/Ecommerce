import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!user) {
    return null
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/products" style={styles.logo}>
          <h2>E-Commerce Store</h2>
        </Link>
        <div style={styles.menu}>
          <Link to="/products" style={styles.link}>
            Products
          </Link>
          {isAdmin() ? (
            <Link to="/admin/products" style={styles.link}>
              Manage Products
            </Link>
          ) : (
            <>
              <Link to="/cart" style={styles.link}>
                Cart {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
              </Link>
              <Link to="/orders" style={styles.link}>
                Orders
              </Link>
            </>
          )}
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    background: 'var(--bg)',
    boxShadow: 'var(--shadow)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    color: 'var(--primary)',
    fontWeight: 600
  },
  menu: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center'
  },
  link: {
    color: 'var(--text)',
    fontWeight: 500,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  badge: {
    background: 'var(--primary)',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 600
  },
  logoutBtn: {
    background: 'var(--danger)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: 500
  }
}

export default Navbar
