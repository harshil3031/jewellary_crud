// // create normal email ,password and simple query based admin authentication middleware
// export const adminAuthMiddleware = (req, res, next) => {
//   const { email, password } = req.headers;
//   console.log("Admin authentication headers:", email, password);
//   const adminEmail = process.env.ADMIN_EMAIL;
//   const adminPassword = process.env.ADMIN_PASSWORD;

//   if (!email || !password) {
//     return res.status(401).json({ error: 'Unauthorized: Admin headers missing' });
//   }
//   if (email === adminEmail && password === adminPassword) {
//     console.log('Admin authenticated');
//     next();
//   } else {
//     res.status(401).json({ error: 'Unauthorized: Admin access required' });
//   }
// };

import jwt from "jsonwebtoken";

export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ error: "Invalid admin credentials" });
  }

  const token = jwt.sign(
    { role: "admin", email },
    jwtSecret,
    { expiresIn: "1h" }
  );

  res.json({ token });
};

export const adminAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const jwtSecret = process.env.JWT_SECRET;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);

    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Forbidden: Admin access required" });
    }

    req.admin = decoded; // attach admin info
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};
