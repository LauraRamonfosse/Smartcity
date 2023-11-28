import { z } from 'zod';

const bookSchema = z.object({
  title: z.string().refine((title) => title.trim() !== '', {
    message: 'Title is required',
  }),
  author: z.string().refine((author) => author.trim() !== '', {
    message: 'Author is required',
  }),
  year: z.string().refine((year) => year.length === 4 && /^\d+$/.test(year), {
    message: 'Year must be 4 digits',
  }),
  genre: z.string().refine((genre) => genre.trim() !== '', {
    message: 'Genre is required',
  }),
  country: z.string().refine((country) => country.trim() !== '', {
    message: 'Country is required',
  }),
  pages: z.number().refine((pages) => pages > 0, {
    message: 'Pages must be a positive number',
  }),
  editor: z.string().refine((editor) => editor.trim() !== '', {
    message: 'Editor is required',
  }),
  isbn: z.string().refine((isbn) => /^\d{3}-\d-\d{4}-\d{4}-\d$/.test(isbn), {
    message: 'ISBN must be in the format XXX-X-XXXX-XXXX-X',
  }),
  summary: z.string().refine((summary) => summary.trim() !== '', {
    message: 'Summary is required',
  }),
  illustrator: z.string().optional(),
  image: z.string().optional(),
});

export { bookSchema };
