import { z } from 'zod';
const UserTypeSchema = z.enum(['Admin', 'User', 'Seller']).refine(value => ['Admin', 'User', 'Seller'].includes(value), {
    message: 'User must be a valid type'
});
const UserStateSchema = z.enum(['Active', 'Banned', 'Deactivate']).refine(value => ['Active', 'Banned', 'Deactivate'].includes(value), {
    message: 'User must be a valid state'
}).default('Active');
const userSchema = z.object({
    username: z.string().min(5).trim(),
    email: z.string().email({ message: 'Invalid email address' }),
    type: UserTypeSchema,
    password: z.string().min(6),
    address: z.string(),
    state: UserStateSchema
});
const userUpdateSchema = userSchema.pick({
    type: true,
    password: true,
    address: true,
    state: true
}).partial();
export function validatePartialUserUpdate(input) {
    return userUpdateSchema.safeParse(input);
}
export function validateUser(input) {
    return userSchema.safeParse(input);
}
//# sourceMappingURL=user.js.map