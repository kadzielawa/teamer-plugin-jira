package teamerExt.plannerApi;

import javax.xml.bind.DatatypeConverter;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class URLConnection {

    private final String USER_AGENT = "Mozilla/5.0";


    public  StringBuffer sendGet(String addressUrl) throws Exception {

        URL url = new URL(addressUrl);
        String user = "xxx"; // username
        String pass = "xxx"; // password or API token
        String authStr = user +":"+  pass;
        String encoding = DatatypeConverter.printBase64Binary(authStr.getBytes("utf-8"));

        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Authorization", "Basic " + encoding);
        connection.connect();

        int code = connection.getResponseCode();

        if(code != 200) {
            throw new Exception("unknown address");
        }

        BufferedReader in = new BufferedReader(
                new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        return response;

    }
}
