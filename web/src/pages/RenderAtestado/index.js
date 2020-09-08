import React, { useMemo } from 'react';
import { PDFDownloadLink, Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import logo from '../../assets/logococ.png';
import footer from '../../assets/footer.png';

function Atestado(props) {
    return (
        <Document>
            <Page style={styles.body}>
                <Image
                    style={styles.image}
                    src={logo}
                />
                <Text style={styles.title}>ATESTADO MÉDICO</Text>
                <Text style={styles.description}>Atesto, para os devidos fins, que o(a) Sr(a)</Text>
                <Text style={styles.description}>{props.name}</Text>
                <Text style={styles.description}>necessita de __________________________________________ dias de licença, por motivo de</Text>
                <Text style={styles.description}>_________________________________________, a partir de __________________________.</Text>
                <Text style={styles.date}>Cachoeirinha-PE,_________ de ______________________ de 20______</Text>
                <View style={styles.footer}>
                    <View style={styles.footerText}>
                        <Text style={styles.text}>_________________________________________</Text>
                        <Text style={styles.text}>Médico</Text>
                    </View>
                    <Image
                        style={styles.image}
                        src={footer}
                    />
                </View>
            </Page>
        </Document>
    );
}

export function DownloadAtestado(props) {
    return (
        useMemo(
            () => (
                <PDFDownloadLink document={<Atestado name={props.name} />} fileName="atestado.pdf">
                    {({ blob, url, loading, error }) => (loading ? '...' : <button className="button" id="downloadButton" type="button">Gerar atestado</button>)}
                </PDFDownloadLink>
            ),
            [],
        )
    )
}

const styles = StyleSheet.create({
    body: {
        paddingTop: 15,
        paddingHorizontal: 1,
    },
    title: {
        color: '#192F5E',
        marginVertical: 50,
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'Times-Roman'
    },
    description: {
        color: '#192F5E',
        fontSize: 14,
        marginHorizontal: 25,
        marginVertical: 10,
        fontFamily: 'Times-Roman'
    },
    date: {
        color: '#192F5E',
        marginHorizontal: 25,
        marginVertical: 150,
        fontSize: 14,
        textAlign: 'right',
        fontFamily: 'Times-Roman'
    },
    text: {
        color: '#192F5E',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Times-Roman'
    },
    image: {
        width: '100%'
    },
    footerText: {
        marginBottom: 35
    },
    footer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center"
    }
});