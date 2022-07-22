import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerItem}>Articles</div>
        <div className={styles.footerItem}>Projects</div>
        <div className={styles.footerItem}>About</div>
        <div className={styles.footerItem}>
          <a href="https://github.com/tylerlouwerse">
            <Image src="/github.png" alt="Vercel Logo" width={30} height={30} />
          </a>
        </div>
        <div className={styles.footerItem}>
        <a href="https://www.linkedin.com/in/tyler-louwerse-415631162/">
            <Image src="/linkedin.png" alt="Vercel Logo" width={30} height={30} />
        </a>
        </div>
      </footer>
    </>
  )
}