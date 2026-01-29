/**
 * Debug API endpoint for environment variable diagnostics
 * 
 * This endpoint safely logs all available environment variables at runtime.
 * It helps diagnose why certain variables may not be accessible in Lambda functions.
 * It can be accessed at /api/debug/env and returns diagnostic information.
 * 
 * **Security**: This endpoint only shows if variables exist and their length,
 * never logging actual sensitive values (tokens, keys, etc.)
 * 
 * **Note:** This endpoint is intended for development/debugging only.
 * In production, consider protecting this endpoint with authentication.
 */

import { NextResponse } from 'next/server';

interface EnvironmentVariable {
  name: string;
  isSet: boolean;
  length?: number;
  sampleValue?: string;
}

interface EnvDiagnostic {
  timestamp: string;
  nodeEnv: string;
  runtime: string;
  allVariablesCount: number;
  cmsVariables: {
    CMS_API_URL: EnvironmentVariable;
    CMS_API_TOKEN: EnvironmentVariable;
  };
  nextVariables: {
    NEXT_PUBLIC_API_URL: EnvironmentVariable;
    NEXT_PUBLIC_API_KEY: EnvironmentVariable;
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: EnvironmentVariable;
  };
  amplifyVariables: {
    AWS_REGION: EnvironmentVariable;
    AWS_ACCESS_KEY_ID: EnvironmentVariable;
    AWS_SECRET_ACCESS_KEY: EnvironmentVariable;
  };
  authVariables: {
    COGNITO_USER_POOL_ID: EnvironmentVariable;
    COGNITO_CLIENT_ID: EnvironmentVariable;
    NEXTAUTH_SECRET: EnvironmentVariable;
  };
  allVariableNames: string[];
  recommendations: string[];
}

/**
 * Safely extract variable info without exposing sensitive values
 */
function getVariableInfo(name: string): EnvironmentVariable {
  const value = process.env[name];
  const isSet = value !== undefined && value !== null && value !== '';

  if (!isSet) {
    return {
      name,
      isSet: false,
    };
  }

  // For sensitive variables, only show if set and approximate length
  const isSensitive =
    name.includes('TOKEN') ||
    name.includes('KEY') ||
    name.includes('SECRET') ||
    name.includes('PASSWORD');

  if (isSensitive) {
    return {
      name,
      isSet: true,
      length: value.length,
      sampleValue: `[REDACTED - ${value.length} chars]`,
    };
  }

  // For non-sensitive variables, show sample
  const isSafeToShow =
    name.includes('URL') ||
    name.includes('REGION') ||
    name.includes('ENV') ||
    name.includes('NODE');

  if (isSafeToShow && value.length < 200) {
    return {
      name,
      isSet: true,
      length: value.length,
      sampleValue: value,
    };
  }

  return {
    name,
    isSet: true,
    length: value.length,
    sampleValue: `[Value too long to display - ${value.length} chars]`,
  };
}

/**
 * GET /api/debug/env
 * Returns all environment variables available at runtime
 */
export async function GET() {
  const allVarNames = Object.keys(process.env).sort();

  const diagnostic: EnvDiagnostic = {
    timestamp: new Date().toISOString(),
    nodeEnv: process.env.NODE_ENV || 'unknown',
    runtime: 'lambda', // Next.js on Amplify runs in Lambda
    allVariablesCount: allVarNames.length,
    cmsVariables: {
      CMS_API_URL: getVariableInfo('CMS_API_URL'),
      CMS_API_TOKEN: getVariableInfo('CMS_API_TOKEN'),
    },
    nextVariables: {
      NEXT_PUBLIC_API_URL: getVariableInfo('NEXT_PUBLIC_API_URL'),
      NEXT_PUBLIC_API_KEY: getVariableInfo('NEXT_PUBLIC_API_KEY'),
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: getVariableInfo(
        'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'
      ),
    },
    amplifyVariables: {
      AWS_REGION: getVariableInfo('AWS_REGION'),
      AWS_ACCESS_KEY_ID: getVariableInfo('AWS_ACCESS_KEY_ID'),
      AWS_SECRET_ACCESS_KEY: getVariableInfo('AWS_SECRET_ACCESS_KEY'),
    },
    authVariables: {
      COGNITO_USER_POOL_ID: getVariableInfo('COGNITO_USER_POOL_ID'),
      COGNITO_CLIENT_ID: getVariableInfo('COGNITO_CLIENT_ID'),
      NEXTAUTH_SECRET: getVariableInfo('NEXTAUTH_SECRET'),
    },
    allVariableNames: allVarNames,
    recommendations: [],
  };

  // Build recommendations based on findings
  const recommendations: string[] = [];

  if (!diagnostic.cmsVariables.CMS_API_URL.isSet) {
    recommendations.push(
      '❌ CMS_API_URL is NOT set. Add to Amplify Console → App Settings → Environment Variables'
    );
  } else {
    recommendations.push(
      `✓ CMS_API_URL is set (${diagnostic.cmsVariables.CMS_API_URL.sampleValue})`
    );
  }

  if (!diagnostic.cmsVariables.CMS_API_TOKEN.isSet) {
    recommendations.push(
      '❌ CMS_API_TOKEN is NOT set. Add to Amplify Console → App Settings → Environment Variables'
    );
  } else {
    recommendations.push(
      `✓ CMS_API_TOKEN is set (${diagnostic.cmsVariables.CMS_API_TOKEN.length} chars)`
    );
  }

  if (diagnostic.nodeEnv !== 'production') {
    recommendations.push(
      `⚠️ NODE_ENV is "${diagnostic.nodeEnv}" - not production. This is normal in development.`
    );
  } else {
    recommendations.push('✓ NODE_ENV is "production" - deployed correctly');
  }

  if (allVarNames.length === 0) {
    recommendations.push(
      '⚠️ WARNING: No environment variables found! This suggests a serious configuration issue.'
    );
  } else {
    recommendations.push(
      `ℹ️ Total environment variables available: ${allVarNames.length}`
    );
  }

  // Check for AWS variables (should be present in Lambda)
  if (!diagnostic.amplifyVariables.AWS_REGION.isSet) {
    recommendations.push(
      '⚠️ AWS_REGION not found - This is expected if not running in AWS Lambda'
    );
  }

  diagnostic.recommendations = recommendations;

  return NextResponse.json(diagnostic, {
    status: 200,
  });
}
