import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';

interface ValidationErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string[];
  error: string;
}

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const exceptionResponse = exception.getResponse();

    let message: string[];

    if (
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse
    ) {
      const messages = exceptionResponse.message;

      if (Array.isArray(messages)) {
        message = messages;
      } else if (typeof messages === 'string') {
        message = [messages];
      } else {
        message = [exception.message];
      }
    } else {
      message = [exception.message];
    }

    const errorResponse: ValidationErrorResponse = {
      statusCode: 400,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      error: 'Erreur de validation',
    };

    response.status(400).json(errorResponse);
  }
}

