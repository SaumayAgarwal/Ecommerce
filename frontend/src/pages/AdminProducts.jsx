import { useState, useEffect } from 'react'
import api from '../api/axios'

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    category: ''
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await api.get('/products?page=0&size=100')
      setProducts(response.data.content)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, formData)
        alert('Product updated successfully!')
      } else {
        await api.post('/products', formData)
        alert('Product added successfully!')
      }
      resetForm()
      fetchProducts()
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to save product')
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl || '',
      category: product.category || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    try {
      await api.delete(`/products/${id}`)
      alert('Product deleted successfully!')
      fetchProducts()
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to delete product')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      imageUrl: '',
      category: ''
    })
    setEditingProduct(null)
    setShowForm(false)
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Manage Products</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={styles.addBtn}
        >
          {showForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {showForm && (
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                style={{ ...styles.input, minHeight: '80px', resize: 'vertical' }}
              />
            </div>

            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Stock *</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                style={styles.input}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div style={styles.formActions}>
              <button type="submit" style={styles.submitBtn}>
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button type="button" onClick={resetForm} style={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={styles.loading}>Loading products...</div>
      ) : (
        <div style={styles.table}>
          <table style={styles.tableElement}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Stock</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} style={styles.tableRow}>
                  <td style={styles.td}>{product.id}</td>
                  <td style={styles.td}>{product.name}</td>
                  <td style={styles.td}>${product.price}</td>
                  <td style={styles.td}>{product.stock}</td>
                  <td style={styles.td}>{product.category || '-'}</td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button
                        onClick={() => handleEdit(product)}
                        style={styles.editBtn}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        style={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    color: 'var(--text)'
  },
  addBtn: {
    padding: '12px 24px',
    background: 'var(--primary)',
    color: 'white',
    borderRadius: '8px',
    fontWeight: 600
  },
  formCard: {
    background: 'var(--bg)',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    marginBottom: '32px'
  },
  formTitle: {
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '24px',
    color: 'var(--text)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text)'
  },
  input: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    fontSize: '15px',
    fontFamily: 'inherit'
  },
  formActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px'
  },
  submitBtn: {
    padding: '12px 24px',
    background: 'var(--primary)',
    color: 'white',
    borderRadius: '8px',
    fontWeight: 600
  },
  cancelBtn: {
    padding: '12px 24px',
    background: 'var(--border)',
    color: 'var(--text)',
    borderRadius: '8px',
    fontWeight: 600
  },
  loading: {
    textAlign: 'center',
    padding: '48px',
    color: 'var(--text-light)'
  },
  table: {
    background: 'var(--bg)',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    overflow: 'hidden'
  },
  tableElement: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    background: 'var(--bg-light)',
    borderBottom: '2px solid var(--border)'
  },
  th: {
    padding: '16px',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text)'
  },
  tableRow: {
    borderBottom: '1px solid var(--border)'
  },
  td: {
    padding: '16px',
    fontSize: '14px',
    color: 'var(--text)'
  },
  actions: {
    display: 'flex',
    gap: '8px'
  },
  editBtn: {
    padding: '6px 12px',
    background: 'var(--primary)',
    color: 'white',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 500
  },
  deleteBtn: {
    padding: '6px 12px',
    background: 'var(--danger)',
    color: 'white',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 500
  }
}

export default AdminProducts
