// Middleware function to handle 404 errors
const notFound = (req, res, next) => {
  // Create a new error object with a custom message
  const error = new Error(`Error 404 - Not Found ${req.originalUrl}`);
  // Set the response status to 404
  res.status(404);
  // Pass the error object to the next middleware function
  next(error);
};

// ======== next() ====================
// The next function is a callback function used in Express middleware functions to pass control to the next middleware function 
// in the application’s request-response cycle.
// When a middleware function completes its task, it can call the next function to pass control to the next middleware function in the stack.
// If an error occurs in a middleware function, it can pass an error object to the next function as an argument.
// When next is called with an error argument, Express will skip all remaining non-error-handling middleware functions and invoke the first error-handling middleware function that is defined in the application.
// Error-handling middleware functions are defined in the same way as other middleware functions but 
// with an additional argument: err. These functions can inspect the error object and take appropriate action, 
// such as logging the error or sending an error response to the client.

// more on : https://www.notion.so/mohitdotexe/Express-learning-fb9edb5389c245ea847ece975e4e7edf?pvs=4

// ======== next() ====================

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
    res.status(500).send(err.message);
  } else {
    res.status(500).send('Something went wrong!');
  }
};

module.exports = { notFound, errorHandler };
