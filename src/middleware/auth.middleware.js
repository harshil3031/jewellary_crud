// create normal email ,password and simple query based admin authentication middleware
export const adminAuthMiddleware = (req, res, next) => {
  const { email, password } = req.headers;
  console.log("Admin authentication headers:", email, password);
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return res.status(401).json({ error: 'Unauthorized: Admin headers missing' });
  }
  if (email === adminEmail && password === adminPassword) {
    console.log('Admin authenticated');
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Admin access required' });
  }
};

