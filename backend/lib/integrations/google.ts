// linio/backend/lib/integrations/google.ts

const GOOGLE_CONFIG = {
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: process.env.GOOGLE_REDIRECT_URI!,
  authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenUrl: "https://oauth2.googleapis.com/token",
  scopes: {
    classroom: process.env.GOOGLE_CLASSROOM_SCOPES!,
    gmail: process.env.GOOGLE_GMAIL_SCOPES!,
    calendar: process.env.GOOGLE_CALENDAR_SCOPES!,
  },
};

export const googleIntegration = {
  // Get auth URL
  getAuthUrl(
    service: "classroom" | "gmail" | "calendar",
    state: string,
  ): string {
    const params = new URLSearchParams({
      client_id: GOOGLE_CONFIG.clientId,
      redirect_uri: GOOGLE_CONFIG.redirectUri,
      response_type: "code",
      scope: GOOGLE_CONFIG.scopes[service],
      state,
      access_type: "offline",
      prompt: "consent",
    });
    return `${GOOGLE_CONFIG.authUrl}?${params.toString()}`;
  },

  // Exchange code for token
  async exchangeCode(code: string): Promise<any> {
    const response = await fetch(GOOGLE_CONFIG.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: GOOGLE_CONFIG.clientId,
        client_secret: GOOGLE_CONFIG.clientSecret,
        redirect_uri: GOOGLE_CONFIG.redirectUri,
        grant_type: "authorization_code",
        code,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to exchange code");
    }

    return response.json();
  },

  // Refresh token
  async refreshToken(refreshToken: string): Promise<any> {
    const response = await fetch(GOOGLE_CONFIG.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: GOOGLE_CONFIG.clientId,
        client_secret: GOOGLE_CONFIG.clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    return response.json();
  },

  // Fetch Classroom courses
  async getClassroomCourses(accessToken: string): Promise<any[]> {
    const response = await fetch(
      "https://classroom.googleapis.com/v1/courses",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }

    const data = await response.json();
    return data.courses || [];
  },

  // Fetch Gmail messages
  async getGmailMessages(accessToken: string, query?: string): Promise<any[]> {
    const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=50${query ? `&q=${encodeURIComponent(query)}` : ""}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch emails");
    }

    const data = await response.json();
    return data.messages || [];
  },

  // Fetch Calendar events
  async getCalendarEvents(accessToken: string): Promise<any[]> {
    const now = new Date();
    const timeMin = now.toISOString();
    const timeMax = new Date(
      now.getTime() + 7 * 24 * 60 * 60 * 1000,
    ).toISOString();

    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
        `timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch calendar events");
    }

    const data = await response.json();
    return data.items || [];
  },
};
