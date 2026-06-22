// linio/backend/lib/integrations/canvas.ts

const CANVAS_CONFIG = {
  clientId: process.env.CANVAS_CLIENT_ID!,
  clientSecret: process.env.CANVAS_CLIENT_SECRET!,
  redirectUri: process.env.CANVAS_REDIRECT_URI!,
  authUrl: process.env.CANVAS_AUTH_URL!,
  tokenUrl: process.env.CANVAS_TOKEN_URL!,
  apiUrl: process.env.CANVAS_API_URL!,
};

export const canvasIntegration = {
  // Get auth URL for OAuth
  getAuthUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: CANVAS_CONFIG.clientId,
      response_type: "code",
      redirect_uri: CANVAS_CONFIG.redirectUri,
      state,
      scope: "url:GET|/api/v1/courses url:GET|/api/v1/assignments",
    });
    return `${CANVAS_CONFIG.authUrl}?${params.toString()}`;
  },

  // Exchange code for token
  async exchangeCode(code: string): Promise<any> {
    const response = await fetch(CANVAS_CONFIG.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: CANVAS_CONFIG.clientId,
        client_secret: CANVAS_CONFIG.clientSecret,
        redirect_uri: CANVAS_CONFIG.redirectUri,
        code,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to exchange code");
    }

    return response.json();
  },

  // Fetch courses
  async getCourses(accessToken: string): Promise<any[]> {
    const response = await fetch(`${CANVAS_CONFIG.apiUrl}/courses`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }

    return response.json();
  },

  // Fetch assignments
  async getAssignments(accessToken: string, courseId: string): Promise<any[]> {
    const response = await fetch(
      `${CANVAS_CONFIG.apiUrl}/courses/${courseId}/assignments`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch assignments");
    }

    return response.json();
  },
};
