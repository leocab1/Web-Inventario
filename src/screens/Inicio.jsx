import { Footer, Menu, Navbar, Title } from "../components";

export const Inicio = () => {
    return (
        <>
            <Navbar />
            <Menu nombre="InveCastor" usuario="Castorcito uwu" />
            <div className="content-wrapper">
                <Title title="Bienvenido(s) al Sistema de Inventario " breadcrums={["Menú principal"]} />
                <section className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                </div>
                                <div className="card-body">
                                    
                                    <div className="text-center">
                                        <img 
                                            src="../../../public/dist/img/castor.jpeg" // Reemplaza con la URL de tu imagen
                                            alt="Imagen de bienvenida"
                                            className="img-fluid"
                                            style={{ maxWidth: "100%", height: "auto" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};
