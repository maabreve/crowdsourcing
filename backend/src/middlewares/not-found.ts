const notFound = (req: any, res: any, next: any) =>{
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
};

export default notFound;
