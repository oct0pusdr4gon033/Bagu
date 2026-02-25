import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    name?: string;
    type?: string;
    image?: string;
    url?: string;
}

export default function SEO({ title, description, name, type, image, url }: SEOProps) {
    // Cuando tengas el dominio real, reemplaza aquí:
    const domain = "https://bagu-two.vercel.app";
    const defaultImage = `${domain}/default-og-image.jpg`; // Una imagen general por defecto de tu marca

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title}</title>
            <meta name='description' content={description} />

            {/* Canonical Link */}
            {url && <link rel="canonical" href={url} />}

            {/* OpenGraph tags (for Facebook, LinkedIn, WhatsApp, etc) */}
            <meta property="og:type" content={type || 'website'} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {name && <meta property="og:site_name" content={name} />}
            <meta property="og:image" content={image || defaultImage} />
            <meta property="og:url" content={url || domain} />

            {/* Twitter tags */}
            <meta name="twitter:creator" content={name || 'Bagu'} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image || defaultImage} />
        </Helmet>
    );
}
