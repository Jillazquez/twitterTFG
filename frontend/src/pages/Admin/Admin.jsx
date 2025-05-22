import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Aquí deberías traer el token o método para enviar token en headers
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3000/api/reported-posts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data);
    } catch (err) {
      setError('Error cargando posts reportados');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReport = async (reportId) => {
    try {
      await axios.delete(`http://localhost:3000/api/reported-posts/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(reports.filter(report => report._id !== reportId));
    } catch (err) {
      alert('Error eliminando el reporte');
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="reported-posts-container">
      <h1>Panel de Posts Reportados</h1>
      {reports.length === 0 ? (
        <p>No hay posts reportados.</p>
      ) : (
        <ul className="reports-list">
          {reports.map(({ _id, reportedPostId, reporter, createdAt }) => (
            <li key={_id} className="report-card">
              <div className="post-info">
                <strong>Post:</strong> {reportedPostId.content || 'Sin contenido'}
              </div>
              <div className="reporter-info">
                <strong>Reportado por:</strong> {reporter.name || reporter.email}
              </div>
              <div className="report-date">
                <strong>Fecha reporte:</strong> {new Date(createdAt).toLocaleString()}
              </div>
              <button className="btn-delete" onClick={() => handleDeleteReport(_id)}>
                Eliminar reporte
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Admin;
