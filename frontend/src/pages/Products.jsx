import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import api from '../api/axios'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const { addToCart } = useCart()
  const [addingToCart, setAddingToCart] = useState({})

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const endpoint = search
        ? `/products/search?keyword=${search}&page=${page}&size=12`
        : `/products?page=${page}&size=12`
      const response = await api.get(endpoint)
      setProducts(response.data.content)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [page, search])

  const handleAddToCart = async (productId) => {
    try {
      setAddingToCart({ ...addingToCart, [productId]: true })
      await addToCart(productId, 1)
      alert('Product added to cart!')
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to add to cart')
    } finally {
      setAddingToCart({ ...addingToCart, [productId]: false })
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(0)
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Products</h1>
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchBtn}>
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div style={styles.loading}>Loading products...</div>
      ) : products.length === 0 ? (
        <div style={styles.empty}>No products found</div>
      ) : (
        <>
          <div style={styles.grid}>
            {products.map((product) => (
              <div key={product.id} style={styles.card}>
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={styles.image}
                  />
                )}
                <div style={styles.content}>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.description}>{product.description}</p>
                  <div style={styles.footer}>
                    <div>
                      <div style={styles.price}>${product.price}</div>
                      <div style={styles.stock}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product.stock === 0 || addingToCart[product.id]}
                      style={{
                        ...styles.addBtn,
                        ...(product.stock === 0 ? styles.disabledBtn : {})
                      }}
                    >
                      {addingToCart[product.id] ? 'Adding...' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div style={styles.pagination}>
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
                style={styles.pageBtn}
              >
                Previous
              </button>
              <span style={styles.pageInfo}>
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages - 1}
                style={styles.pageBtn}
              >
                Next
              </button>
            </div>
          )}
        </>
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
  header: {
    marginBottom: '32px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    marginBottom: '24px',
    color: 'var(--text)'
  },
  searchForm: {
    display: 'flex',
    gap: '12px',
    maxWidth: '500px'
  },
  searchInput: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    fontSize: '15px'
  },
  searchBtn: {
    padding: '12px 24px',
    background: 'var(--primary)',
    color: 'white',
    borderRadius: '8px',
    fontWeight: 600
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  },
  card: {
    background: 'var(--bg)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: 'var(--shadow)',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    background: 'var(--bg-light)'
  },
  content: {
    padding: '20px'
  },
  productName: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '8px',
    color: 'var(--text)'
  },
  description: {
    fontSize: '14px',
    color: 'var(--text-light)',
    marginBottom: '16px',
    lineHeight: 1.5,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: '12px'
  },
  price: {
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--primary)'
  },
  stock: {
    fontSize: '13px',
    color: 'var(--text-light)'
  },
  addBtn: {
    padding: '10px 20px',
    background: 'var(--secondary)',
    color: 'white',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '14px'
  },
  disabledBtn: {
    background: 'var(--border)',
    cursor: 'not-allowed',
    opacity: 0.6
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '24px',
    marginTop: '32px'
  },
  pageBtn: {
    padding: '10px 20px',
    background: 'var(--primary)',
    color: 'white',
    borderRadius: '8px',
    fontWeight: 600
  },
  pageInfo: {
    color: 'var(--text-light)',
    fontWeight: 500
  },
  loading: {
    textAlign: 'center',
    padding: '48px',
    color: 'var(--text-light)'
  },
  empty: {
    textAlign: 'center',
    padding: '48px',
    color: 'var(--text-light)'
  }
}

export default Products
