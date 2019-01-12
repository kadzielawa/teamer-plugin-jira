package teamerExt.rest;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement
public class ViewModel {

    @XmlElement(name = "id")
    private String id;
    @XmlElement(name = "viewId")
    private int viewId;
    @XmlElement(name = "viewName")
    private String viewName;
    @XmlElement(name = "okp")
    private double okp;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getViewId() {
        return viewId;
    }

    public void setViewId(int viewId) {
        this.viewId = viewId;
    }

    public String getViewName() {
        return viewName;
    }

    public void setViewName(String viewName) {
        this.viewName = viewName;
    }

    public double getOkp() {
        return okp;
    }

    public void setOkp(double okp) {
        this.okp = okp;
    }

}
