import org.junit.Test;
import util.StringParse;


public class StringTest {
    @Test
    public void testDate(){
        StringParse sp = new StringParse();
        System.out.println(sp.stringToDate("445555555"));
    }
}
