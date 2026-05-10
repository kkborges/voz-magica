/**
 * DashboardLayout - Layout base para dashboards profissionais
 * Sidebar responsiva, header com busca e notificações, área de conteúdo
 */

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState } from 'react';
import './DashboardLayout.css';

interface NavItem {
  id: string;
  icon: string;
  label: string;
  path?: string;
  badge?: number;
  onClick?: () => void;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

interface DashboardLayoutProps {
  title: string;
  breadcrumb?: string[];
  navigation: NavSection[];
  activeItemId?: string;
  userName: string;
  userRole: string;
  userAvatar?: string;
  notifications?: number;
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
  onUserMenuClick?: () => void;
  children: ReactNode;
  className?: string;
}

export default function DashboardLayout({
  title,
  breadcrumb = [],
  navigation,
  activeItemId,
  userName,
  userRole,
  userAvatar,
  notifications = 0,
  onSearch,
  onNotificationClick,
  onUserMenuClick,
  children,
  className = '',
}: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleNavItemClick = (item: NavItem) => {
    item.onClick?.();
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div
      className={`dashboard-layout ${
        sidebarCollapsed ? 'dashboard-layout--collapsed' : ''
      } ${sidebarOpen ? 'dashboard-layout--sidebar-open' : ''} ${className}`}
    >
      {/* Header */}
      <header className="dashboard-layout__header">
        <div className="dashboard-layout__header-left">
          <button
            className="dashboard-layout__sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>

          <div>
            <h1 className="dashboard-layout__header-title">{title}</h1>
            {breadcrumb.length > 0 && (
              <nav className="dashboard-layout__header-breadcrumb">
                {breadcrumb.map((item, index) => (
                  <span key={index}>
                    {index > 0 && <span> / </span>}
                    {item}
                  </span>
                ))}
              </nav>
            )}
          </div>
        </div>

        <div className="dashboard-layout__header-right">
          {/* Search */}
          {onSearch && (
            <div className="dashboard-layout__search">
              <span className="dashboard-layout__search-icon">🔍</span>
              <input
                type="text"
                className="dashboard-layout__search-input"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          )}

          {/* Notifications */}
          <motion.div
            className="dashboard-layout__notifications"
            onClick={onNotificationClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span style={{ fontSize: '24px' }}>🔔</span>
            {notifications > 0 && (
              <motion.div
                className="dashboard-layout__notifications-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              >
                {notifications > 99 ? '99+' : notifications}
              </motion.div>
            )}
          </motion.div>

          {/* User Menu */}
          <motion.div
            className="dashboard-layout__user-menu"
            onClick={onUserMenuClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="dashboard-layout__user-avatar">
              {userAvatar || userName.charAt(0).toUpperCase()}
            </div>
            <div className="dashboard-layout__user-info">
              <div className="dashboard-layout__user-name">{userName}</div>
              <div className="dashboard-layout__user-role">{userRole}</div>
            </div>
            <span>▼</span>
          </motion.div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="dashboard-layout__sidebar">
        <div className="dashboard-layout__sidebar-header">
          <div className="dashboard-layout__logo">
            <span>🎯</span>
            <span className="dashboard-layout__logo-text">Voz Mágica</span>
          </div>
          <button
            className="dashboard-layout__sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label="Toggle sidebar"
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>

        <nav className="dashboard-layout__nav">
          {navigation.map((section, sectionIndex) => (
            <div key={sectionIndex} className="dashboard-layout__nav-section">
              {section.title && (
                <div className="dashboard-layout__nav-section-title">
                  {section.title}
                </div>
              )}
              {section.items.map((item) => (
                <motion.div
                  key={item.id}
                  className={`dashboard-layout__nav-item ${
                    activeItemId === item.id
                      ? 'dashboard-layout__nav-item--active'
                      : ''
                  }`}
                  onClick={() => handleNavItemClick(item)}
                  whileHover={{ x: sidebarCollapsed ? 0 : 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="dashboard-layout__nav-icon">{item.icon}</span>
                  <span className="dashboard-layout__nav-label">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <motion.span
                      className="dashboard-layout__nav-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>
          ))}
        </nav>

        <div className="dashboard-layout__sidebar-footer">
          <motion.div
            className="dashboard-layout__nav-item"
            whileHover={{ x: sidebarCollapsed ? 0 : 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="dashboard-layout__nav-icon">⚙️</span>
            <span className="dashboard-layout__nav-label">Configurações</span>
          </motion.div>
          <motion.div
            className="dashboard-layout__nav-item"
            whileHover={{ x: sidebarCollapsed ? 0 : 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="dashboard-layout__nav-icon">❓</span>
            <span className="dashboard-layout__nav-label">Ajuda</span>
          </motion.div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-layout__content">{children}</main>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && window.innerWidth < 1024 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 99,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
