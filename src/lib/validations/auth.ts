import { z } from 'zod';

// register validation schema
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required'),

  email: z
    .email('Please enter a valid email'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),
});

// login validation schema
export const loginSchema = z.object({
  email: z
    .email('Please enter a valid email'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),
});

// Password validation schema
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Current password must be at least 8 characters")
      .max(125, "Current password is too long"),
    
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .max(125, "New password is too long"),
    //   .regex(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    //     "New password must contain at least one uppercase letter, one lowercase letter, and one number"
    //   ),
    
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// reset password validation schema
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z
      .string()
      .min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

// forget password validation schema
export const forgotPasswordSchema = z.object({
    email: z.email("Please enter a valid email address."),
});

// magic link login validation schema
export const magicLinkLoginSchema = z.object({
  email: z.email('Please enter a valid email address.'),
});

// send verification validation schema
export const sendVerificationEmailSchema = z.object({
  email: z.email('Please enter a valid email address.'),
});

export type RegisterFormInput = z.input<typeof registerSchema
>;
export type RegisterInput = z.output<typeof registerSchema
>;

export type LoginFormInput = z.input<typeof loginSchema
>;
export type LoginInput = z.output<typeof loginSchema
>;

export type ChangePasswordFormInput = z.input<typeof changePasswordSchema>;
export type ChangePasswordInput = z.output<typeof changePasswordSchema>;

export type ResetPasswordFormInput = z.input<typeof resetPasswordSchema>;
export type ResetPasswordInput = z.output<typeof resetPasswordSchema>;

export type ForgotPasswordFormInput = z.input<typeof forgotPasswordSchema>;
export type ForgotPasswordInput = z.output<typeof forgotPasswordSchema>;

export type MagicLinkLoginFormInput = z.input<typeof magicLinkLoginSchema>;
export type MagicLinkLoginInput  = z.output<typeof magicLinkLoginSchema>;

export type SendVerificationEmailFormInput =
  z.input<typeof sendVerificationEmailSchema>;
export type SendVerificationEmailInput =
  z.output<typeof sendVerificationEmailSchema>;