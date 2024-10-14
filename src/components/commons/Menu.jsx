
export const Menu = ({ nombre, usuario }) => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="../../index3.html" className="brand-link">
                <span className="brand-text font-weight-light">{ nombre }</span>
            </a>

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">{ usuario }</a>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Mobiliario
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="../../index.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Dashboard v1</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="../../index2.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Dashboard v2</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="../../index3.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Dashboard v3</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="../widgets.html" className="nav-link">
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    Personas
                                    <span className="right badge badge-danger">New</span>
                                </p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-copy"></i>
                                <p>
                                    Ubicaciones
                                    <i className="fas fa-angle-left right"></i>
                                    <span className="badge badge-info right">6</span>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="../layout/top-nav.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Top Navigation</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="../layout/top-nav-sidebar.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Top Navigation + Sidebar</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="../layout/boxed.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Boxed</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="../layout/fixed-sidebar.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Fixed Sidebar</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="../layout/fixed-sidebar-custom.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Fixed Sidebar <small>+ Custom Area</small></p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="../layout/fixed-topnav.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Fixed Navbar</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="../layout/fixed-footer.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Fixed Footer</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="../layout/collapsed-sidebar.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Collapsed Sidebar</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-chart-pie"></i>
                                <p>
                                    Informes
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="../charts/chartjs.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>ChartJS</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="../charts/flot.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Flot</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="../charts/inline.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Inline</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="../charts/uplot.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>uPlot</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}