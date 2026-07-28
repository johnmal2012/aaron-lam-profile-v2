type NavItem = {
  label: string;
  href: string;
};

type ParsedNavItems = NavItem[];


export function parseNavItems(value: string) {
  try {
    const parsed:ParsedNavItems = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return {
        success: false as const,
        error: 'Navigation items must be an array',
      };
    }

    return {
      success: true as const,
      data: parsed,
    };
  } catch {
    return {
      success: false as const,
      error: 'Invalid JSON format',
    };
  }
}