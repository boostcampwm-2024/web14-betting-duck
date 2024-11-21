class AccessError extends Error {
  constructor(
    message: string,
    public readonly code: string = "ACCESS_DENIED",
    public readonly status: number = 403,
    public readonly target?: string,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "AccessError";
    Object.setPrototypeOf(this, AccessError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AccessError);
    }
    this.timestamp = new Date();
  }

  readonly timestamp: Date;
  static unauthorized(
    message = "Unauthorized access",
    details?: Record<string, unknown>,
  ): AccessError {
    return new AccessError(message, "UNAUTHORIZED", 401, undefined, details);
  }

  static forbidden(
    message = "Access forbidden",
    details?: Record<string, unknown>,
  ): AccessError {
    return new AccessError(message, "FORBIDDEN", 403, undefined, details);
  }

  static insufficientPermissions(
    resource: string,
    details?: Record<string, unknown>,
  ): AccessError {
    return new AccessError(
      `Insufficient permissions to access ${resource}`,
      "INSUFFICIENT_PERMISSIONS",
      403,
      resource,
      details,
    );
  }
}

export { AccessError };
