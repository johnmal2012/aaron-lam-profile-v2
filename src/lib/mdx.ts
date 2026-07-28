import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getMDXComponents } from '@/lib/mdx-components';

export async function renderMDX(source: string) {
  const { content } = await compileMDX({
    source,
    components: getMDXComponents({}),
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return content;
}
