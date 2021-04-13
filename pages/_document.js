import Document, { Html, Head, Main, NextScript } from 'next/document'
import Header from '../components/Header'

class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="robots" content="noindex" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-gray-200">
          <Header />
          <div className="max-w-screen-lg mx-auto px-4">
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    )
  }
}

export default AppDocument
