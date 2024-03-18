interface ValidationResponse{
    isValid: boolean;
    errors: Record<string, string>;
  
}

export default ValidationResponse;