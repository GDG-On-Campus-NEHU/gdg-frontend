import React, { useEffect } from 'react';

const ADMIN_URL = 'https://site--gdg-backend--6b5qrljpcqzc.code.run/admin/';

function AdminRedirectPage() {
  useEffect(() => {
    window.location.replace(ADMIN_URL);
  }, []);

  return (
    <main className="page-container">
      <p>Redirecting to admin...</p>
      <p>
        If you are not redirected,{' '}
        <a href={ADMIN_URL} target="_self">
          open admin
        </a>
        .
      </p>
    </main>
  );
}

export default AdminRedirectPage;
