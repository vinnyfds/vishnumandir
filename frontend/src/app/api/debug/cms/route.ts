/**
 * Debug API endpoint for CMS connectivity testing
 * 
 * This endpoint tests Strapi CMS connectivity from the deployed frontend server.
 * It can be accessed at /api/debug/cms and returns diagnostic information.
 * 
 * **Note:** This endpoint is intended for development/debugging only.
 * In production, consider protecting this endpoint with authentication.
 */

import { NextResponse } from 'next/server';

interface DiagnosticResult {
  endpoint: string;
  status: 'success' | 'error' | 'no-content';
  httpCode?: number;
  itemCount?: number;
  totalCount?: number;
  error?: string;
  timestamp: string;
}

interface EnvironmentInfo {
  cms_api_url_set: boolean;
  cms_api_token_set: boolean;
  cms_api_url: string;
}

/**
 * Test a CMS endpoint and return diagnostic information
 */
async function testCmsEndpoint(
  endpoint: string,
  cmsApiUrl: string,
  cmsApiToken: string
): Promise<DiagnosticResult> {
  const startTime = new Date();

  try {
    const url = new URL(`${cmsApiUrl}/${endpoint}`);
    url.searchParams.append('populate', '*');
    url.searchParams.append('pagination[limit]', '1');

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (cmsApiToken) {
      headers['Authorization'] = `Bearer ${cmsApiToken}`;
    }

    // Use AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url.toString(), {
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      return {
        endpoint,
        status: 'error',
        httpCode: response.status,
        error: data?.error?.message || `HTTP ${response.status}`,
        timestamp: startTime.toISOString(),
      };
    }

    // Check if data structure is correct
    if (!Array.isArray(data?.data)) {
      return {
        endpoint,
        status: 'error',
        httpCode: response.status,
        error: 'Invalid response structure: data is not an array',
        timestamp: startTime.toISOString(),
      };
    }

    const itemCount = data.data.length;
    const totalCount = data?.meta?.pagination?.total || 0;

    if (itemCount === 0 && totalCount === 0) {
      return {
        endpoint,
        status: 'no-content',
        httpCode: response.status,
        itemCount: 0,
        totalCount: 0,
        timestamp: startTime.toISOString(),
      };
    }

    return {
      endpoint,
      status: 'success',
      httpCode: response.status,
      itemCount,
      totalCount,
      timestamp: startTime.toISOString(),
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    return {
      endpoint,
      status: 'error',
      error: errorMessage,
      timestamp: startTime.toISOString(),
    };
  }
}

/**
 * GET /api/debug/cms
 * Returns CMS connectivity diagnostics
 */
export async function GET() {
  // Check environment variables
  const cmsApiUrl =
    process.env.CMS_API_URL || 'https://cms.vishnumandirtampa.com/api';
  const cmsApiToken = process.env.CMS_API_TOKEN || '';

  const environmentInfo: EnvironmentInfo = {
    cms_api_url_set: !!process.env.CMS_API_URL,
    cms_api_token_set: !!process.env.CMS_API_TOKEN,
    cms_api_url: cmsApiUrl,
  };

  // Test all content type endpoints
  const contentTypes = [
    'events',
    'announcements',
    'newsletters',
    'priests',
    'puja-services',
    'pages',
  ];

  const diagnosticResults: DiagnosticResult[] = await Promise.all(
    contentTypes.map((contentType) =>
      testCmsEndpoint(contentType, cmsApiUrl, cmsApiToken)
    )
  );

  // Calculate summary
  const summary = {
    total_tests: diagnosticResults.length,
    successful: diagnosticResults.filter((r) => r.status === 'success').length,
    no_content: diagnosticResults.filter((r) => r.status === 'no-content')
      .length,
    errors: diagnosticResults.filter((r) => r.status === 'error').length,
  };

  // Build recommendations
  const recommendations: string[] = [];

  if (summary.errors > 0) {
    recommendations.push(
      'API connectivity issues detected. Verify CMS_API_TOKEN and CMS_API_URL environment variables.'
    );
    recommendations.push(
      'Check Strapi API token has proper permissions (find, findOne for each content type).'
    );
    recommendations.push('Verify Strapi server is running and accessible.');
  }

  if (summary.no_content > 0) {
    recommendations.push(
      'Some content types have no published items. Create test content in Strapi Admin Panel.'
    );
    recommendations.push('Ensure content is PUBLISHED (not just saved as draft).');
  }

  if (summary.successful > 0 && summary.errors === 0) {
    recommendations.push('✓ All API endpoints accessible. Frontend should work correctly.');
  }

  return NextResponse.json(
    {
      timestamp: new Date().toISOString(),
      environment: environmentInfo,
      summary,
      results: diagnosticResults,
      recommendations,
      frontend_pages: {
        event: [
          '/ (home - featured events)',
          '/calendar/current-events',
          '/education/events (filtered by category)',
        ],
        announcement: ['/ (home)'],
        puja_service: ['/religious/puja-services'],
        priest: ['/religious/priests'],
        newsletter: ['/calendar/newsletter'],
        page: ['Dynamic pages (not currently used)'],
      },
    },
    {
      status: summary.errors > 0 ? 500 : 200,
    }
  );
}
